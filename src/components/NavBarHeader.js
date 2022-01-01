import React from "react";
import { useHistory } from "react-router-dom";
import Icon from "@material-tailwind/react/Icon";
import styled from "styled-components";
import propTypes from "prop-types";
import { connect } from "react-redux";
import AppTheme from "../common/styles";
import { setSidebarVisibility } from "../Redux/Actions/Themes";

function NavBarHeader({ Theme, setSidebarVisibility }) {
  let history = useHistory();
  const { THEME, SIDEBARSTATUS } = Theme;

  return (
    <Header
      theme={THEME}
      className="sticky top-0 z-50 px-4 py-2 flex items-center shadow-md justify-between"
    >
      {SIDEBARSTATUS === "hidden" ? (
        <div
          className="cursor-pointer"
          onClick={() => setSidebarVisibility("visible")}
        >
          <Icon name="menu" size="3xl" color={AppTheme[THEME].BACKGROUND} />
        </div>
      ) : (
        <div
          className="cursor-pointer"
          onClick={() => setSidebarVisibility("hidden")}
        >
          <Icon name="clear" size="3xl" color={AppTheme[THEME].BACKGROUND} />
        </div>
      )}
      <div
        className="cursor-pointer"
        onClick={() => {
          localStorage.removeItem("jwt");

          history.push("/");
        }}
      >
        <Icon
          name="power_settings_new"
          size="3xl"
          color={AppTheme[THEME].BACKGROUND}
        />
      </div>
    </Header>
  );
}
const mapStateToProps = (state) => ({
  Theme: state.Theme,
});

const mapDispatchToProps = {
  setSidebarVisibility: (status) => setSidebarVisibility(status),
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBarHeader);

NavBarHeader.propTypes = {
  Theme: propTypes.object.isRequired,
  setSidebarVisibility: propTypes.func.isRequired,
};

const Header = styled.header`
  background-color: ${({ theme }) => AppTheme[theme].BACKGROUND};
`;
