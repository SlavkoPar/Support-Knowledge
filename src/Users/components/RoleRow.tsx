import * as React from 'react';

import { useHover } from '../../common/useHover'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faEdit, faCaretRight, faCaretDown, faPlus, faAppleWhole } from '@fortawesome/free-solid-svg-icons'
import { Badge, Button, ListGroup } from 'react-bootstrap'


import { IRole, IUser } from '../types';
import { ThemeContext } from '../../ThemeContext';


interface IUserRowProps {
	who: IUser;
	userRole: IRole;
	toggleRole: (roleId: number) => void;
	editRole: (roleId: number) => void;
	removeRole: (roleId: number) => void;
	add: (roleId: number, text: string, canEdit?: boolean) => void;
}

const RoleRow: React.FC<IUserRowProps> = (props: IUserRowProps) => {

	const [hoverRef, hoverProps] = useHover();
	const { who, userRole, toggleRole, editRole, removeRole, add } = props;
	const { roleId, title, users, isExpanded, color } = userRole;

	const theme = React.useContext(ThemeContext);
	const { darkMode, variant, bg } = theme.state;

	return (
		<div ref={hoverRef}>
			<button
				className="button-edit"
				title="Expand"
				onClick={() => toggleRole(roleId)}
				style={{ marginLeft: '5px' }}
			>
				<FontAwesomeIcon icon={isExpanded ? faCaretDown : faCaretRight} color={color} size='lg' />
			</button>
			<Button
				variant='link'
				size="sm"
				className="py-0 mx-1 text-decoration-none"
			>
				{title}
			</Button>
			<Button
				variant={variant}
				size="lg"
				className="py-0 px-1"
				style={{ backgroundColor: 'transparent', borderWidth: '0' }}
				title="Add a new User"
				onClick={() => add(roleId, '')}
				disabled={roleId === 11}
			>
				<FontAwesomeIcon icon={faPlus} size='xs' color='orange' />
			</Button>
			{hoverProps.isHovered && who.roleId === 11 &&
				<button className="button-edit" title="Edit Section" onClick={() => editRole(roleId)}>
					<FontAwesomeIcon icon={faEdit} color='lightblue' />
				</button>
			}
			{hoverProps.isHovered && users.length === 0 && who.roleId === 11 &&
				<button className="button-remove" title="Remove Section" onClick={() => removeRole(roleId)}>
					<FontAwesomeIcon icon={faWindowClose} color='lightblue' />
				</button>
			}
			<Badge bg="primary" pill>
				{users.length}
			</Badge>
		</div>
	)
}

export default RoleRow

