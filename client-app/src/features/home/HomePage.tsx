import { observer } from "mobx-react-lite";
import React from "react";
import { Link, redirect } from "react-router-dom";
import { Button, Container, Header, Segment, Image } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegsiterForm from "../users/RegsiterForm";

export default observer(function HomePage() {
  const { userStore, modalStore } = useStore();
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container className="container" text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Pulse
        </Header>
        <Header className="subtitle" as="h2" >
          Gestão de vendas
        </Header>
        {userStore.isLoggedIn ? (
          <>
            <Header
              as="h3"
              
              content={`Bem-vindo de volta ${userStore.user?.displayName}`}
            />
            <Button className="nextButton" as={Link} to="/sales" size="huge" >
              Prosseguir
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => modalStore.openModal(<LoginForm />, "mini")}
              size="huge"
              
            >
              Login!
            </Button>
            {/* <Button onClick={() => modalStore.openModal(<RegsiterForm />, 'mini')} size='huge' inverted>
                            Cadastrar
                        </Button> */}
          </>
        )}
      </Container>
    </Segment>
  );
});
