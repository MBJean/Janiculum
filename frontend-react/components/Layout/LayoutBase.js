import FooterBase from "components/Footer/FooterBase";
import NavigationBase from "components/Navigation/NavigationBase";

const LayoutBase = props => (
  <main>
    <NavigationBase />
    {props.children}
    <FooterBase />
  </main>
);

export default LayoutBase;
