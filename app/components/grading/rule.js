import { queries, tiers } from 'ebisu/constants';
import upfirst from '../../modifiers/upfirst';
import { FaPlus } from 'react-icons/fa';
import './style.css';

/**
 * Representation of a single rule.
 *
 * @param {[type]} {} [description]
 * @constructor
 */
export default function Rule({ onChange,  ...query }) {
  function remove(e) {
    if (e && e.preventDefault) e.preventDefault();

    onChange && onChange(undefined);
  }

  return (
    <form action="#">
      <a href="#" className="chip chip-add">
        <FaPlus color="white" />
      </a>

      {
        Object.keys(query || {}).map((name) => (
          <div className="chip" key={ name }>
            <input type="hidden" name={ name } value={ query[name] } />
            <strong title={ queries[name] }>{ name.split('.').map(upfirst).join('.') }</strong>
            { query[name] }

            <a href="#" className="btn btn-clear" aria-label="Close" role="button" onClick={ remove }></a>
          </div>
        ))
      }
    </form>
  );
}
