import { Fragment, useContext } from 'react';
import { useRef } from 'react'
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { IRole, IRolesProps } from '../types'

import UserForm from '../containers/UserForm'
import UserRow from './UserRow';
import RoleRow from './RoleRow';
import { ThemeContext } from "../../ThemeContext";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// type SupportParams = {
// 	tekst: string;
// };

const UserPage: React.FC<IRolesProps> = (props: IRolesProps) => {

	//let { tekst } = useParams<SupportParams>();
	const { who, roles, userEditing,
		formMode, roleIdEditing,
		onSelectUser, add, edit, remove, canEdit,
		addRole, toggleRole, editRole, removeRole, storeRole } = props;

	const inputEl = useRef<HTMLInputElement>(null);
	setTimeout(() => {
		if (inputEl.current !== null) {
			inputEl.current!.select();
			inputEl.current!.focus()
		}
	}, 100)

	// const expandRole = (roleId: number): void => {
	// 	const div = document.querySelector<HTMLDivElement>("#divRole" + roleId);
	// 	console.log(div)
	// 	div!.style.display = 'block';
	// }
	const theme = useContext(ThemeContext);
	const { darkMode, variant, bg } = theme.state;

	const userRoles: IRole[] = roles ?? [];
	console.log({userRoles})

	return (
		<Container fluid>
			<Row className={`${darkMode ? "dark" : "light"}`}>
				<Col md={7}>
					<div style={{ border: '0px solid silver' }}>
						<h5>Users by Role{' '}
							<button className="button-add-category button-edit" title="Add a new Role" onClick={() => addRole()}>
								<FontAwesomeIcon icon={faPlus} size='xs' color='lightblue' />
							</button>
						</h5>
						<ListGroup
							as="ul"
							variant={variant}
						>
							{userRoles.map(role => {
								const { roleId, title, isExpanded, users } = role;
								return (
									<Fragment key={roleId}>
										<ListGroup.Item
											variant={variant}
											className="py-0 px-1"
											as="li"
											key={roleId + "_1"}
										>
											<div className="d-flex justify-content-start align-items-center" style={{ textAlign: 'start' }}>
												{roleIdEditing === roleId &&
													<input ref={inputEl} name="groupTitle" type="text"
														onBlur={(e) => storeRole({ ...role, title: e.target.value })}
														defaultValue={title}
													/>
												}
												{roleIdEditing !== roleId && (
													<RoleRow
														who={who}
														userRole={role}
														toggleRole={toggleRole}
														editRole={editRole}
														removeRole={removeRole}
														add={add}
													/>
												)}
											</div>
										</ListGroup.Item>
										{isExpanded && role.users.length > 0 &&
											<ListGroup.Item
												variant={variant}
												className="py-0 px-1"
												as="li"
												key={roleId + "_2"}
											>
												<ListGroup
													as="ul"
													variant={variant}
													className="inner-list py-0 ms-5"
												>
													{users.map(user =>
														<UserRow
															who={who}
															key={user.userId}
															user={user}
															onSelectUser={onSelectUser}
															edit={edit}
															remove={remove}
														/>
													)}
												</ListGroup>
											</ListGroup.Item>
										}
									</Fragment>
								);
							})}
						</ListGroup>
					</div>
				</Col>
				<Col md={5}>
					<div className={`${darkMode ? "dark" : "light"}`}>
						{userRoles && userEditing &&
							<div style={{ border: '1px solid silver', borderRadius: '5px', padding: '5px 5px 15px 5px' }}>
								<h4 style={{ marginTop: 0, color: 'white' }}>User</h4>
								<UserForm canEdit={formMode === 'display' ? false : canEdit} />
							</div>
						}
					</div>
				</Col>
			</Row>
		</Container>
	);
}

export default UserPage

