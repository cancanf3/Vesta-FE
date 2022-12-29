import * as React from "react";
import { SectionType } from "../../Types/ComponentTypes";
import "./AppContainer.css";
import { EntityContainer } from "./EntityContainer";
import { Box, CircularProgress, Tab, Tabs } from "@mui/material";
import { useSelector } from "react-redux";
import { selectInformationStatus } from "../../Redux/LendingInformationSlice";

export const AppContainer = () => {
  const [section, setSection] = React.useState<SectionType>("Loan");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setSection(newValue);
  };

  const AppIndicator = () => {
    const stateStatus = useSelector(selectInformationStatus);
    if (stateStatus === "Processing") {
      return <CircularProgress color="secondary" size={30} />;
    }

    return <React.Fragment />;
  };

  return (
    <div className="appContainer">
      <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex" }}>
        <Tabs
          value={section}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab value="Loan" label="Loan Information" />
          <Tab value="Borrower" label="Loan Borrower" />
        </Tabs>
        <div className="progressIndicator">
          <AppIndicator />
        </div>
      </Box>
      <EntityContainer entityType={section} />
    </div>
  );
};
