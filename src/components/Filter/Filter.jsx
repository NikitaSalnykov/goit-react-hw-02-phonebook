import PropTypes from 'prop-types'


export const Filter = ({onChange}) => {
    return (
        <div>
        <label htmlFor="filter">Find contacts by name</label>
        <input type="text" name="input" id="input" onChange={onChange}/>
        </div>
            )
}