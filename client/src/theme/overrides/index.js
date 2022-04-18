import { merge } from "lodash";
import Pickers from "./Pickers";

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return merge(Pickers(theme));
}
