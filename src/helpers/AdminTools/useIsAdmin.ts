import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPreview } from "../../Model/user/action";
import { RootStore } from "../redux/store";

const useIsAdmin = () => {
    const isAdmin = useSelector((store: RootStore) => !!store.user.token)
    const isPreview = useSelector((store: RootStore) => !!store.user.isPreview);
    const dispatch = useDispatch();
    const preview = useCallback((value: boolean) => {
        dispatch(setPreview({ value }));
    }, [])
    return { isAdmin, isPreview, preview };
}

export default useIsAdmin;