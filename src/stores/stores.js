import { store } from "rfx-core";

import AppState from "./AppState";
import KpiState from "./KpiState";
import OprState from "./OprState";

export default store.setup({
	appState: AppState,
	kpiState: KpiState,
	oprState: OprState,
});
