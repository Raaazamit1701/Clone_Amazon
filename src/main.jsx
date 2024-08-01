import ReactDOM from "react-dom/client";
import App from "./components/App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
// import firebaseConfig from "./firebase.config";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "./index.css";
import { ProductDataContextProvider } from "./context/ProductDataContextProvider";
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ProductDataContextProvider>
      <App />
    </ProductDataContextProvider>
  </Provider>
  // </React.StrictMode>
);
