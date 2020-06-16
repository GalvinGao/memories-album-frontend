import service from './service'
import store from '@/store'

/**
 * Object Life-cycle manager
 * Automatically fetch data when passed object's TTL
 */
class ObjectManager {
  /** Creates a manager
   *
   * @param {Object} api endpoint url that will be used to refresh the data from. the manager will send a GET request to the corresponding url
   * @param {number} ttl time-to-live (TTL), in milliseconds
   * @param {Object<Function, Function(Promise)>} ajaxHooks the first function will be called before sending the request, and the second function will be called after done receiving the request, with the request Promise as the argument
   */
  constructor({ name, api, transform, ttl, ajaxHooks }) {
    this.name = name;
    this.api = api;
    this.transform = transform;
    this.ttl = ttl;
    this.ajaxHooks = ajaxHooks;
  }

  get cacheValid() {
    let cacheUpdateAt = store.getters['data/updated'](this.name)
    console.debug("ObjectManager", "cache status of id:",
      this.name,
      "valid:",
      cacheUpdateAt + this.ttl > Date.now(),
      "updated:",
      cacheUpdateAt,
      "ttl:",
      this.ttl,
      "timeNow:",
      Date.now()
    );
    return cacheUpdateAt + this.ttl > Date.now()
  }

  _transform (data) {
    return this.transform(data)
  }


  /**
   * returns local cache if ttl has been fulfilled, and fetches external api when
   * the ttl of local cache is outdated or the local cache is not available
   *
   * @async
   * @param {boolean} forced equals true can skip tll check
   * @returns {Promise} the promise that resolves when refresh completed
   */
  async refresh(forced = false) {
    const context = this;
    if (!forced && context.cacheValid) {
      // valid cache
      console.debug("ObjectManager", "cache: valid. id:", this.name);
      return Promise.resolve();
    } else {
      context.ajaxHooks.request(context.name);
      // outdated cache, fetch api
      console.debug("ObjectManager", `cache: invalid, fetching api. reason:`,
        forced ? '[Force Refresh]' : '[Cache Outdated]',
        "id:",
        this.name
      );

      const response = service(context.api)
        .then(({ data }) => {
          data = context._transform(data);

          store.commit("data/storeData", {
            name: context.name,
            value: data
          });

          console.info("ObjectManager", `fetched data "${context.name}" at ${Date.now()}`);

          return data
        });
      context.ajaxHooks.response(context.name, response);
      return response;
    }
  }
}


export default ObjectManager