import classNames from 'classnames/bind';
import styles from './Configurations.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faListCheck } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Configurations() {
    return (
        <div className={cx('item')}>
            <FontAwesomeIcon className={cx('icon')} icon={faListCheck} />
            <span className={cx('text')}>Configurations</span>
            {/* <FontAwesomeIcon className={cx('icondown')} icon={faAngleDown}/> */}
        </div>
    );
}

export default Configurations;
