<template>
  <div>
      <h5 >Set Notification Rules </h5>
      <b-button>+ Add notifications rules</b-button>
      <h3></h3>
<table class="table table-striped">
    <thead>
        <tr>
            <th class="text-left sm-3">Action</th>
            <th>Rules</th>
            <th>Edit</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="text-left">
             <div class="switch"
                     data-on-label=""
                     data-off-label="">
                     <input type="checkbox" class="switch" checked/>
                </div> </td>
                <td>When Price to Rent Ratio is more than 40</td>
                <td class="td-actions text-left">

               <button type="button" rel="tooltip" title="Edit Profile" class="btn btn-success btn-simple btn-xs">

                    <i class="fa fa-edit"></i>

                </button>

                <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-simple btn-xs">

                    <i class="fa fa-times"></i>

                </button></td>
        </tr>
      </tbody>
</table>

<h5 >Notifications </h5>

<div >
<input id="checkbox1" type="checkbox" class="switch" checked />
 <label for="checkbox1"> Sent via E-mail Address  </label>
</div>  
<div>
<input id="checkbox2" type="checkbox" class="switch" checked />
 <label for="checkbox2"> Sent via SMS </label>
</div>  
</div>   
</template>