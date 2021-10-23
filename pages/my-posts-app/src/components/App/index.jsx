import React from "react";
import { CssBaseline } from "@material-ui/core";
import { useSelector } from "react-redux";
import "./App.css";
import SimpleSnackbar from "./SimpleSnackBar";
import appActions from "./App.actions";
import { Box } from "@mui/system";
import LoadingView from "./LoadingView";
import Footer from "./Footer";
import Header from "./Header";

function App({ children }) {
  const { busy, toast } = useSelector((state) => state.app);
  const { message, type } = toast;
  const { removeToastMessage } = appActions();

  return (
    <>
      <CssBaseline />
      <Header />
      <main>
        <Box height="1px">
          <LoadingView currentlySending={busy} />
        </Box>
        {children}
      </main>
      <Footer />
      {message && (
        <SimpleSnackbar
          clearMessage={removeToastMessage}
          message={message}
          type={type}
        />
      )}
    </>
  );
}

export default App;
