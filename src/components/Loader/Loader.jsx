import { Dna } from 'react-loader-spinner';
export const Loader = () => {
  return (
    <div
      style={{
        margin: 'o auto',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};
