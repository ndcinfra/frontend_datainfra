import { store } from "rfx-core";

import AppState from "./AppState";
import KpiState from "./KpiState";

export default store.setup({
	appState: AppState,
	kpiState: KpiState,
});
