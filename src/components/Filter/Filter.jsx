import { Input } from 'components/ContactForm/ContactForm.styled'
import PropTypes from 'prop-types'


export const Filter = ({onChange}) => {
    return (
        <div>
        <label style={{ marginRight: '14px' }} htmlFor="filter">Find contacts by name</label>
        <Input type="text" name="input" id="filter" onChange={onChange}/>
        </div>
            )
}

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
}