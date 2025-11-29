function Error({ statusCode }) {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{statusCode || 500}</h1>
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An unexpected error occurred'}
      </p>
    </div>
  );
}

// This ensures Next.js knows the status code
Error.getInitialProps = ({ res, err }) => {
  const statusCode = res?.statusCode || err?.statusCode || 500;
  return { statusCode };
};

export default Error;
