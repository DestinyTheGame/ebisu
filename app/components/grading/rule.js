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
  /**
   * Remove the given que
   *
   * @param {[type]} e [description]
   * @returns {[type]} [description]
   */
  function remove(name) {
    if (e && e.preventDefault) e.preventDefault();

    const clone = { ...query };
    delete clone[name];

    onChange && onChange(undefined, clone);
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

            <a href="#" className="btn btn-clear" aria-label="Close" role="button" onClick={ remove.bind(remove, name) }></a>
          </div>
        ))
      }
    </form>
  );
}
