import { useContext} from 'react'
import { ThemeContext} from '../App'
import { Button } from 'react-bootstrap'

export default (props) => {
    const theme = useContext(ThemeContext);
    const { variant } = theme.state;
    return (
      <Button variant={variant} {...props}>
        {props.children}
      </Button>
    );
  }

  