var express = require('express');
var router = express.Router();

/* GET Inventory page. */
router.get('/', function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM innovatiview.innovative_table',function(err,rows)
		{
			if(err)
			var errornya  = ("Error Selecting : %s ",err );   
			req.flash('msg_error', errornya);
			res.render('inno/sheet',{title:"Sheet",data:rows});
		});
         console.log(query.sql);
     });
});

/* Add Inventory details*/
router.post('/add', function(req, res, next) {
	req.assert('i_type', 'Please fill the details').notEmpty();
	var errors = req.validationErrors();
	if (!errors) {
		v_i_type = req.sanitize( 'i_type' ).escape().trim(); 
		v_i_model = req.sanitize( 'i_model' ).escape().trim();
		v_i_price = req.sanitize( 'i_price' ).escape().trim();
		v_i_details = req.sanitize( 'i_details' ).escape().trim();

		var inno = {
      
			i_type: v_i_type,
			i_model: v_i_model,
			i_price : v_i_price,
			i_details : v_i_details
		}

		var insert_sql = 'INSERT INTO innovatiview.innovative_table SET ?';
		req.getConnection(function(err,connection){
			var query = connection.query(insert_sql, inno, function(err, result){
				if(err)
				{
					var errors_detail  = ("Error Insert : %s ",err );   
					req.flash('msg_error', errors_detail); 
					res.render('inno/form', 
					{ 
						i_type: req.param('i_type'), 
						i_model: req.param('i_model'),
						i_price: req.param('i_price'),
						i_details: req.param('i_details')
					});
				}else{
					req.flash('msg_info', 'Form submitted successfully'); 
					res.redirect('/inno/');
				}		
			});
		});
	}else{

		console.log(errors);
		errors_detail = "Sorry there are errors<ul>";
		for (i in errors) 
		{ 
			error = errors[i]; 
			errors_detail += '<li>'+error.msg+'</li>'; 
		} 
		errors_detail += "</ul>"; 
		req.flash('msg_error', errors_detail); 
		res.render('inno/form', 
		{ 
			i_type: req.param('i_type'), 
			i_model: req.param('i_model'),
			i_price: req.param('i_price'),
			i_details: req.param('i_details')
		});
	}

});
/* Get Inventory details*/
router.get('/add', function(req, res, next) {
	res.render(	'inno/form', 
	{ 
		title: 'New Entry',
		i_type: '',
		i_model: '',
		i_price:'',
		i_details:''
	});
});

module.exports = router;