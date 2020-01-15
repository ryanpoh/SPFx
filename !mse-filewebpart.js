<style type="text/css">
    .dynamic-template .dynamic-items .dynamic-item {
        background: #ffffff;
        box-shadow: 0px 0px 6px #bfbebe;
        margin-bottom: 15px;
    }
    .dynamic-template .dynamic-items .dynamic-item h3 {
        background: #47b4de;
        color: #fff;
        padding: 5px 5px 7px 10px;
        margin: 0px;
    }
    .dynamic-template .dynamic-items .dynamic-item .dynamic-item-fields {
        padding: 10px;
    }
    .dynamic-template .dynamic-items .dynamic-item .dynamic-item-fields span {
        display: block;
        font-size: 12px;
    }
    table {
        border-collapse: collapse;
        width: 100%;
        margin-top: -26px !important;
    }
    
    th, td {
        text-align: left;
        border-bottom: 1px solid #ddd;
        height: 40px;
        padding-right:10px;
    }
    
    h {
        color: rgb(51, 51, 51);
        font-size: 24px;
    }
    
    tr:hover {
        background-color:#f5f5f5;
    }
    
    .dynamic-template a{
        user-select: none;
        color: #333333;
        text-decoration: none;
    }
 
    @media only screen and (max-width: 500px) 
    {
        table {
            margin-top: 10px !important;
            margin-bottom: 10px !important;
        }
    }
</style>

<div class="dynamic-template">


        <table>
            <thead>
                <tr>
                    <td>Last Modified Date</td>
                    <td></td>
                    <td>Title</td>
                </tr>
        </thead>    
        {{#each items}}
            <div class="dynamic-item">
                <div class="dynamic-item-fields">
                <tr>
                    <td>{{SMLastModifiedDate.textValue}}</td>
                    <td width="5%" ><img src="https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/20/{{File_x0020_Type.textValue}}.svg?refresh1" width="20" height="20"></td>
                    <td><a href="https://liquidoffice.sharepoint.com{{FileDirRef.textValue}}/{{FileLeafRef.textValue}}?web=1">{{FileLeafRef.textValue}}</a></td>
                </tr>
                </div>
            </div>
        {{/each}}
        </table>

</div>