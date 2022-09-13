import { useEffect } from 'react';

const useEffectPartialDeps = (effect, deps) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, deps);
};

export default useEffectPartialDeps;
