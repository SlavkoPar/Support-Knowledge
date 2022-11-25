import * as React from 'react';

import { useHover } from '../../common/useHover'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faEdit } from '@fortawesome/free-solid-svg-icons'

import { IUser } from '../types';
import { Button, ListGroup } from 'react-bootstrap';
import { ThemeContext } from '../../ThemeContext';
import { userReducer } from '../reducer';


interface IRowProps {
	who: IUser;
	user: IUser;
	onSelectUser: (userId: number) => IUser;
	edit: (roleId: number, userId: number) => void;
	remove: (roleId: number, userId: number) => void;
}

const UserRow: React.FC<IRowProps> = (props: IRowProps) => {

	const [hoverRef, hoverProps] = useHover();

	const { who, user, onSelectUser, edit, remove } = props;
	const { roleId, userId, userName } = user;

	const theme = React.useContext(ThemeContext);
	const { darkMode, variant, bg } = theme.state;

	return (
		<ListGroup.Item
			as="li"
			className="py-0"
			variant={variant}
		>
			<div ref={hoverRef} className="d-flex justify-content-start align-items-center">
				<Button
					style={{ fontSize: '13px' }}
					variant='link'
					size="sm"
					className="py-0 px-1 text-decoration-none"
					onClick={() => onSelectUser(userId)}>
					{userName} {userId}
				</Button>
				{hoverProps.isHovered &&
					<Button
						variant={variant}
						size="sm"
						className="py-0 px-1"
						style={{ backgroundColor: 'transparent', borderWidth: '0' }}
						title="Edit"
						onClick={() => edit(roleId, userId)}
					>
						<FontAwesomeIcon icon={faEdit} color='lightblue' />
					</Button>
				}
				{hoverProps.isHovered && who.roleId === 11 &&
					<Button
						variant={variant}
						size="sm"
						className="py-0 px-1"
						style={{ backgroundColor: 'transparent', borderWidth: '0' }}
						title="Remove"
						onClick={() => remove(roleId, userId)}
					>
						<FontAwesomeIcon icon={faWindowClose} color='lightblue' />
					</Button>
				}
			</div>
		</ListGroup.Item>
	)
}

export default UserRow

