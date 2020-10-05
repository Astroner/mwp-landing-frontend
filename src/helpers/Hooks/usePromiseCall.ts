import { useState, useEffect, useCallback } from "react";

function usePromiseCall<DataType>(
  call: () => Promise<DataType>
): [boolean, DataType | null, boolean, VoidFunction];
function usePromiseCall<DataType, Argument>(
  call: (arg: Argument) => Promise<DataType>,
  args: Argument
): [boolean, DataType | null, boolean, VoidFunction];
function usePromiseCall<DataType, Arguments = undefined>(
  call: (args?: Arguments) => Promise<DataType>,
  args?: Arguments
): [boolean, DataType | null, boolean, VoidFunction] {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<DataType | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let isMounted = true;
    call(args)
      .then((res) => {
        if (!isMounted) return;
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (!isMounted) return;
        setError(true);
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [call, args, count]);

  const reload = useCallback(() => setCount((p) => p + 1), []);

  return [loading, data, error, reload];
}

export default usePromiseCall;
