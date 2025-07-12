import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Media.module.scss';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Medias() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('item')}>
                <Link to={'/media'}>
                    <FontAwesomeIcon
                        className={cx('icon')}
                        icon={faFile}
                    />
                    <span className={cx('text')}>Tài nguyên</span>
                </Link>
            </div>
        </div>
    );
}

export default Medias;
