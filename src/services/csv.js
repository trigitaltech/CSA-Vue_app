let csvContent = 'data:text/csv;charset=utf-8,';

export default (row, name) => {
        let currLine = row.join(',');
        csvContent += currLine + '\n';
    const encodeUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodeUri);
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
}