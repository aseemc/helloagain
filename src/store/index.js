import { createStore } from "redux";
import bounties from "./bounties/reducer";

export default createStore(bounties);