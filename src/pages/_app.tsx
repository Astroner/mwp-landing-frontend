import App, { AppContext } from 'next/app'
import { languageMap } from '../api/language';
import { ServerTextProvider } from '../helpers/ServerText';
import { IServerTextContext } from '../helpers/ServerText/ServerTextContext';
import { Provider } from "react-redux";

import "normalize.css";
import "./global.scss";
import { getStore } from '../helpers/redux/store';

export default class MyApp extends App<{ lg: string, map: Record<string, IServerTextContext["lngMap"]> }> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    
    const [pageProps, server] = await Promise.all([
      Component.getInitialProps ? Component.getInitialProps(ctx) : Promise.resolve({}),
      languageMap(),
    ]);
    const map: Record<string, IServerTextContext["lngMap"]> = {};
    
    for (let item of server) {
      for (let key in item) {
        if (key.slice(0, 4) !== "lng_") continue;
        const lng = key.slice(4);

        if (!(lng in map)) {
          map[lng] = {};
        }
        map[lng][item.key] = { value: item[key], id: item._id };
      }
    }
    const lg = ctx.query.en ? "en" : "ru"
    return {
      pageProps,
      map,
      lg
    };
  }

  store = getStore()

  render() {
    const { Component, pageProps, map, lg } = this.props;
    return (
      <Provider store={this.store} >
        <ServerTextProvider lg={lg} initialMap={map}>
          <Component {...pageProps} />
        </ServerTextProvider>
      </Provider>
    );
  }
}