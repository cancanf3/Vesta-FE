import * as React from "react";
import { SectionType, SectionTypes } from "../../Types/ComponentTypes";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./AppContainer.css";
import { EntityContainer } from "./EntityContainer";

type Prop = {};

export const AppContainer = ({}: Prop) => {
  const [section, setSection] = React.useState<SectionType>("Loan");

  const onSectionChange = (
    event: React.MouseEvent<HTMLElement>,
    newSection: string
  ) => {
    setSection(newSection);
  };

  const toggleButtons = () => {
    return SectionTypes.map((section: string) => (
      <ToggleButton key={section} value={section}>
        {section}
      </ToggleButton>
    ));
  };

  return (
    <div className="appContainer">
      <ToggleButtonGroup
        color="standard"
        value={section}
        exclusive
        onChange={onSectionChange}
        aria-label="Platform"
      >
        {toggleButtons()}
      </ToggleButtonGroup>
      <div className="formContainer">
        <EntityContainer entityType={section} />
      </div>
    </div>
  );
};
