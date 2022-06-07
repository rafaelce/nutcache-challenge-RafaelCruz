import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Dropdown, Image, Menu } from "semantic-ui-react";
import ActivityForm from "../../features/activities/form/ActivityForm";
import { useStore } from "../stores/store";

export default function NavBar() {
  const {
    userStore: { user, logout },
    modalStore,
  } = useStore();

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item exact as={NavLink} to="/" header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          NutCache
        </Menu.Item>
        <Menu.Item>
          {/* <Button
            as={NavLink}
            to="/createEmployee"
            positive
            content="New Employee"
          /> */}
          <Button
            content="New Employee"
            positive
            onClick={() => modalStore.openModal(<ActivityForm />)}
          ></Button>
        </Menu.Item>
        <Menu.Item position="right">
          <Image
            src={user?.image || "/assets/user.png"}
            avatar
            spaced="right"
          />
          <Dropdown pointing="top left" text={user?.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to={`/profile/${user?.displayName}`}
                text="Profile"
                icon="user"
              />
              <Dropdown.Item onClick={logout} text="Logout" icon="power" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
}
