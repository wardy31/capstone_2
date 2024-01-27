import React, { useEffect } from "react";
export function useFetch(url) {
  useEffect(() => {
    url();
  }, []);
}
