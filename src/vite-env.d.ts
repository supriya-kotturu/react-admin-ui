/// <reference types="vite/client" />
interface ImportMetaEnv {
	readonly VITE_USER_DATA_URL: string;
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
