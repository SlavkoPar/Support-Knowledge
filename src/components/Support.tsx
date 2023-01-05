import * as React from 'react';

import containers from '../Categories/containers/ContainerCategoriesPage'

// type TParams = { id: string };

// function Product({ match }: RouteComponentProps<TParams>) {
//   return <h2>This is a page for product with ID: {match.params.id} </h2>;
// }

interface IMyProps {
}

const Support: React.FC<IMyProps> = (props: IMyProps) => { 
  return (
      <containers.supporter handleClose={()=>{}} />
  );
};

export default Support;