import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { locales, languages } from 'app/config/translation';
import { getUser, getRoles, updateUser, createUser, reset } from './user-management.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IUserManagementUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ login: string }> {}

export const UserManagementUpdate = (props: IUserManagementUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.login);

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getUser(props.match.params.login);
    }
    props.getRoles();
    return () => props.reset();
  }, []);

  const handleClose = () => {
    props.history.push('/admin/user-management');
  };

  const saveUser = (event, values) => {
    if (isNew) {
      props.createUser(values);
    } else {
      props.updateUser(values);
    }
    handleClose();
  };

  const isInvalid = false;
  const { user, loading, updating, roles } = props;

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1>
            <Translate contentKey="userManagement.home.createOrEditLabel">Create or edit a User</Translate>
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm onValidSubmit={saveUser}>
           
              <AvGroup>
                <Label for="login">
                  <Translate contentKey="userManagement.login">Login</Translate>
                </Label>
                <AvField
                  type="text"
                  className="form-control"
                  name="login"
                  validate={{
                    required: {
                      value: true,
                      errorMessage: translate('register.messages.validate.login.required')
                    },
                    pattern: {
                      value: '^[_.@A-Za-z0-9-]*$',
                      errorMessage: translate('register.messages.validate.login.pattern')
                    },
                    minLength: {
                      value: 1,
                      errorMessage: translate('register.messages.validate.login.minlength')
                    },
                    maxLength: {
                      value: 50,
                      errorMessage: translate('register.messages.validate.login.maxlength')
                    }
                  }}
                  value={user.login}
                />
              </AvGroup>
            
              <AvGroup>
                <Label for="authorities">
                  <Translate contentKey="userManagement.profiles">Language Key</Translate>
                </Label>
                <AvInput type="select" className="form-control" name="authorities" value={user.authorities} multiple>
                  {roles.map(role => (
                    <option value={role} key={role}>
                      {role}
                    </option>
                  ))}
                </AvInput>
              </AvGroup>
              <Button tag={Link} to="/admin/user-management" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" type="submit" disabled={isInvalid || updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  user: storeState.userManagement.user,
  roles: storeState.userManagement.authorities,
  loading: storeState.userManagement.loading,
  updating: storeState.userManagement.updating
});

const mapDispatchToProps = { getUser, getRoles, updateUser, createUser, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagementUpdate);
