import { FaDiscord, FaTwitter, FaGithubAlt } from 'react-icons/fa';
import { TacticalAirSupport } from '../assets';
import classnames from 'classnames';
import './style.css';

/**
 * List of socials to guide people to help, and clout.
 *
 * @type {Array}
 * @private
 */
const socials = [
  ["https://twitter.com/FpsEden", "Follow me on Twitter for bad takes", <FaTwitter />],
  ["https://discord.gg/N9Q4Ys8MNK", "Join our Discord to ask questions", <FaDiscord />],
  ["https://github.com/DestinyTheGame/ebisu", "GitHub, if you're looking to contribute", <FaGithubAlt />]
];

export default function Header({ items }) {
  return (
    <header className="navbar">
      <section className="navbar-section">
        {
          items && items.map(({ name, onClick, active }) => (
            <a key={ name } href="#" className={ classnames('btn', 'btn-link', {
              active
            })} onClick={ onClick }>{ name }</a>
          ))
        }
      </section>
      <section className="navbar-center">
        <TacticalAirSupport height={ 40 } />
        <span className="name">ebisu</span>
      </section>
      <section className="navbar-section">
        {
          socials.map(([href, tooltip, icon]) => (
            <a href={ href } data-tooltip={ tooltip } className="btn btn-link tooltip tooltip-left" key={ href }>
              { icon }
            </a>
          ))
        }
      </section>
    </header>
  )
}
