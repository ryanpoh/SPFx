import * as React from "react";
import {
  Header,
  Image,
  Segment,
  Container,
  Grid,
  List,
  Divider
} from "semantic-ui-react";

const Footer = props => {
  return (
    <Segment
      inverted
      vertical
      style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
    >
      <Container textAlign="center">
        <Grid divided inverted stackable>
          <Grid.Column width={3}>
            <Header inverted as="h4" content="Countries" />
            <List link inverted>
              <List.Item as="a">Indonesia</List.Item>
              <List.Item as="a">Malaysia</List.Item>
              <List.Item as="a">Singapore</List.Item>
              <List.Item as="a">Philipines</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as="h4" content="Testimonies" />
            <List link inverted>
              <List.Item as="a">People</List.Item>
              <List.Item as="a">Clients</List.Item>
              <List.Item as="a">Employees</List.Item>
              <List.Item as="a">Tell Us</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as="h4" content="Products" />
            <List link inverted>
              <List.Item as="a">Training</List.Item>
              <List.Item as="a">Hardware</List.Item>
              <List.Item as="a">Services</List.Item>
              <List.Item as="a">Licenses</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header inverted as="h4" content="The SRKK Way" />
            <p>
              Whatever we say, we will do it. Your one-stop IT solution partner.
            </p>
          </Grid.Column>
        </Grid>

        <Divider inverted section />
        <Image
          centered
          size="mini"
          src="https://scontent.fkul15-1.fna.fbcdn.net/v/t1.0-9/10250238_749649325075954_3569938738366370416_n.jpg?_nc_cat=103&_nc_ohc=KLV3YBoyNKYAQmYQvrIPb-peXCDfeM3Y8_XYUpIljr7M0yhUJ3KbOkHcg&_nc_ht=scontent.fkul15-1.fna&oh=27204a1d0d7fe1b668fc76331d651561&oe=5EA5FDEA"
        />
        <List horizontal inverted divided link size="small">
          <List.Item as="a" href="#">
            Site Map
          </List.Item>
          <List.Item as="a" href="#">
            Contact Us
          </List.Item>
          <List.Item as="a" href="#">
            Terms and Conditions
          </List.Item>
          <List.Item as="a" href="#">
            Privacy Policy
          </List.Item>
        </List>
      </Container>
    </Segment>
  );
};

export default Footer;
