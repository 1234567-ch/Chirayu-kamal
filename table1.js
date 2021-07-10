$('myTable tr').each(function(row, tr){
    TableData = TableData 
        + $(tr).find('td:eq(0)').text() + ' '  // Task No.
        + $(tr).find('td:eq(1)').text() + ' '  // Date
        + $(tr).find('td:eq(2)').text() + ' '  // Description
        + $(tr).find('td:eq(3)').text() + ' '  // Task
        + '\n';
});
var TableData = new Array();
    
$('#sampleTbl tr').each(function(row, tr){
    TableData[row]={
        "taskNo" : $(tr).find('td:eq(0)').text()
        , "date" :$(tr).find('td:eq(1)').text()
        , "description" : $(tr).find('td:eq(2)').text()
        , "task" : $(tr).find('td:eq(3)').text()
    }
}); 
TableData.shift();  // first row is the table header - so remove
var TableData;
TableData = storeTblValues()
TableData = $.toJSON(TableData);

function storeTblValues()
{
    var TableData = new Array();

    $('#sampleTbl tr').each(function(row, tr){
        TableData[row]={
            "taskNo" : $(tr).find('td:eq(0)').text()
            , "date" :$(tr).find('td:eq(1)').text()
            , "description" : $(tr).find('td:eq(2)').text()
            , "task" : $(tr).find('td:eq(3)').text()
        }    
    }); 
    TableData.shift();  // first row will be empty - so remove
    return TableData;
}
var TableData;
TableData = $.toJSON(storeTblValues());
                
 $.ajax({
    type: "POST",
    url: "processJSONarray.php",
    data: "pTableData=" + TableData,
    success: function(msg){
        // return value stored in msg variable
    }
});
// Unescape the string values in the JSON array
$tableData = stripcslashes($_POST['pTableData']);

// Decode the JSON array
$tableData = json_decode($tableData,TRUE);

// now $tableData can be accessed like a PHP array
echo $tableData[1]['description'];