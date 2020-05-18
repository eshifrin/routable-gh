import React from 'react';
import classnames from 'classnames';
import {Repo as TRepo} from '../api/index';
import {RootState} from "../reducers";
import {useDispatch, useSelector} from 'react-redux';
import {fetchIssues} from '../reducers/github';

function Repos() {
  const repos = useSelector((state: RootState) => state.github.repos);

  if (!repos.length) {
    return null;
  }
  return (
    <div className="repos">
      {
        repos.map((repoProps) => {
          return(<Repo key={repoProps.fullName} {...repoProps}/>)
        })
      }

    </div>

  )
}

function Repo({name, owner, fullName}: TRepo) {
  const isSelected = false;
  // TODO: connect

  const dispatch = useDispatch();
  const onSelect = () => dispatch(fetchIssues({name, owner, fullName}));

  return (
    <div className={classnames("repo", {selected: isSelected})} style={{display: 'flex'}} onClick={onSelect}>
        <div className="info">
          <div className="label">owner</div>
          <div className="data">{owner}</div>
        </div>
        <div className="info">
          <div className="label">repo</div>
          <div className="data">{name}</div>
        </div>
    </div>
  )
}

export default Repos;
