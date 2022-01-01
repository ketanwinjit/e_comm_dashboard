import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import AppTheme from "../common/styles";

const sidebarOptions = [
  {
    id: 1,
    name: "Categories",
    route: "/store/categories",
  },
  {
    id: 2,
    name: "Products",
    route: "/store/products",
  },
  {
    id: 3,
    name: "Orders",
    route: "/store/orders",
  },
  {
    id: 4,
    name: "Other",
    route: "/store/others",
  },
];

function Sidebar({ Theme }) {
  const { THEME, SIDEBARSTATUS } = Theme;

  return (
    <Container
      visible={SIDEBARSTATUS}
      theme={THEME}
      className="w-49 shadow-md absolute"
    >
      {sidebarOptions.map((option, index) => {
        return (
          <div key={index} className="w-48 px-4 py-4 cursor-pointer">
            <Link to={option.route}>
              <h4 className="items-center">{option.name}</h4>
            </Link>
          </div>
        );
      })}
    </Container>
  );
}

const mapStateToProps = (state) => ({
  Theme: state.Theme,
});

export default connect(mapStateToProps, null)(Sidebar);

const Container = styled.div`
  visibility: ${({ visible }) => visible};
  transition: 0.25s ease;
  transform: ${({ visible }) =>
    visible === "visible" ? `translateX(0%)` : `translateX(-100%)`};
  background-color: ${({ theme }) => AppTheme[theme].SIDEBAR};
  height: 91%;
`;
