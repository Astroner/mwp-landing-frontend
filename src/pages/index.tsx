import { NextPage } from "next";
import { useEffect } from "react";
import { getBloggers } from "../api/bloggers";
import Editable from "../component/Editable/";
import useIsAdmin from "../helpers/AdminTools/useIsAdmin";
import { useServerText } from "../helpers/ServerText";

import cn from "./index.module.scss";

interface IIndex {
  items: { id: string, name: string, aq: number }[]
  lng: string
}

const Index: NextPage<IIndex> = (props) => {
  const { languages, switchLng } = useServerText();
  const { isAdmin, isPreview, preview } = useIsAdmin();
  useEffect(() => {
    switchLng(props.lng)
  }, [])
  return (
    <div className={cn.root}>
      <div className={cn.switch}>
        {languages.map((lng) => (
          <div className={cn.lng} key={lng} onClick={() => switchLng(lng)}>
            {lng}
          </div>
        ))}
        {isAdmin && (
          <div className={cn.lng} onClick={() => preview(!isPreview)}>
            Preview mode
          </div>
        )}
      </div>
      <Editable component="h1" name="title" className={cn.title} />
      <Editable component="p" name="paragraph" className={cn.paragraph} />
      <div>
        <Editable component="h2" name="bloggers_title" />
        <div style={{ display: "flex" }}>
          {props.items.map((item) => (
            <div style={{ padding: 20, border: "1px solid black", marginRight: 10 }} key={item.id}>
              <div>name: {item.name}</div>
              <div>aq: {item.aq}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Index.getInitialProps = async (ctx) => {

  try {
    const items = await getBloggers();

    return {
      lng: ctx.query.en ? "en" : "ru",
      items,
    };
  }catch(e){
    return {
      items: [],
      lng: "ru"
    }
  }
}

export default Index;