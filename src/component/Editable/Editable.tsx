import React, { FC, HTMLAttributes, memo, useCallback, useContext, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { updateById } from '../../api/language';
import useIsAdmin from '../../helpers/AdminTools/useIsAdmin';
import useClass from '../../helpers/Hooks/useClass';
import { RootStore } from '../../helpers/redux/store';
import ServerTextContext from '../../helpers/ServerText/ServerTextContext';

import cn from "./Editable.module.scss";
import EditingModal from './EditingModal';

export interface IEditable extends HTMLAttributes<HTMLElement> {
    name: string
    component?: any
}

const Editable: FC<IEditable> = ({ component: Component = "div", name, className, ...props }) => {

  const context = useContext(ServerTextContext);
  const [isEditing, setIsEditing] = useState(false)

  const { isAdmin, isPreview } = useIsAdmin();

  const token = useSelector((store: RootStore) => store.user.token)

  const text = useMemo(() => {
    return context?.lngMap[name]?.value || name;
  }, [context])

  const id = useMemo(() => {
    return context?.lngMap[name]?.id || null;
  }, [])

  const root = useClass(className, isAdmin && !isPreview ? cn.root : null);

  const save = useCallback(
    (next: string) => {
      if (!token || !id || !context) return;
      updateById(token, id, context.lng, next)
        .then(() => {
          setIsEditing(false);
          context.updateKey(name, next);
        })
        .catch(() => {
          alert("FAILURE");
        });
    },
    [token, id, context]
  );

  return (
    <>
      <Component {...props} className={root}>
        {text}
        {isAdmin && !isPreview && (
          <div onClick={() => setIsEditing(true)} className={cn.edit}>
            edit
          </div>
        )}
      </Component>
      {isEditing && (
        <EditingModal
          initialValue={text}
          onSuccess={save}
          onClose={() => setIsEditing(false)}
        />
      )}
    </>
  );
};



export default memo(Editable)