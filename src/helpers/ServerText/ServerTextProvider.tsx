import React, { FC, memo, ReactNode, useCallback, useMemo, useState } from "react";

import Context, { IServerTextContext as IContext } from "./ServerTextContext";

export interface IServerTextProvider {
  initialMap: Record<string, IContext["lngMap"]>;
  lg: string
  children: ReactNode;
}

const ServerTextProvider: FC<IServerTextProvider> = ({ initialMap, lg, ...props }) => {

    const [lngMap, setLngMap] = useState(initialMap);

    const [lng, setLng] = useState(lg || "ru");

    const languages = useMemo(() => {
      return Object.keys(lngMap);
    }, [lngMap]);

    const update = useCallback((key: string, value: string) => {
      setLngMap(prev => ({
        ...prev,
        [lng]: {
          ...prev[lng],
          [key]: { id: prev[lng][key].id, value }
        }
      }))
    }, [lng])
    
    const value = useMemo<IContext>(() => {
      return {
        languages,
        lng,
        lngMap: lngMap[lng] || {},
        switchLng: setLng,
        updateKey: update,
      };
    }, [lngMap, lng]);

    return (
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    )
}

export default memo(ServerTextProvider)