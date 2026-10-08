import { useState } from "react";

function useData(initialData) {
  const [data] = useState(initialData);

  return data;
}

export default useData;