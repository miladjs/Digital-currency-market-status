function ConverData(data, type) {
  if (!data || !type) return null;

  const ConvertedData = data[type].map((item) => {
    return {
      name: item[1],
      [type]: item[1],
    };
  });

  return ConvertedData;
}

export { ConverData };
