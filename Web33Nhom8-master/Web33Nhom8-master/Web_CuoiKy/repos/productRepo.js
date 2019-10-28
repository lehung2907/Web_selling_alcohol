var db = require('../fn/db');
var config = require('../config/config');

exports.loadAll = () => {
	var sql = 'select * from products';
	return db.load(sql);
}
exports.load4ByView = offset => {
	var sql = `select * from products  order by View desc limit 4 offset ${offset} `;
	return db.load(sql);
}
exports.load4ByNew = offset => {
	var sql = `select * from products  order by ProID desc limit 4 offset ${offset}`;
	return db.load(sql);
}
exports.load4BySell = offset => {
	var sql = `select * from products  order by Sell desc limit 4 offset ${offset} `;
	return db.load(sql);
}


exports.load4ByCat =(catId, offset) => {
	var sql = `select * from products where CatID = ${catId} limit 4 offset ${offset}`;
	return db.load(sql);
}
exports.load4ByProducer = (producerId, offset) => {
	var sql = `select * from products where ProducerID = ${producerId}  limit 4 offset ${offset} `;
	return db.load(sql);
}


exports.loadAllByCat = catId => {
	var sql = `select * from products where CatID = ${catId}`;
	return db.load(sql);
}

exports.loadPageByCat = (catId, offset) => {
	var sql = `select * from products where CatID = ${catId} limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
	return db.load(sql);
}
exports.loadPageByProducer = (producerId, offset) => {
	var sql = `select * from products where ProducerID = ${producerId} limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
	return db.load(sql);
}
exports.countByCat = catId => {
	var sql = `select count(*) as total from products where CatID = ${catId}`;
	return db.load(sql);
}
exports.countByProducer = producerId => {
	var sql = `select count(*) as total from products where ProducerID = ${producerId}`;
	return db.load(sql);
}

exports.single = id => {
	var sql = `select * from products join categories on (products.CatID = categories.CatID) join producers on (products.ProducerID = producers.ProducerID)  where ProID = ${id}`;
	return db.load(sql);
}

exports.sell = (id,quantity) => {
	var sql = `update products set Quantity = Quantity - ${quantity},Sell=Sell+${quantity} where ProID = ${id}`;
	return db.load(sql);
}
exports.view = (id) => {
	var sql = `update products set View = View + 1 where ProID = ${id}`;
	return db.load(sql);
}
exports.search = (name,CatID,ProducerID,PriceMin,PriceMax,offset) => {
	if((CatID===-1)&(ProducerID===-1))
	{
		var sql = `select * from products where ProName like '%${name}%' and Price between ${PriceMin} and ${PriceMax} limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
	}
	if((CatID===-1)&(ProducerID!=-1))
	{
		var sql = `select * from products where ProName like '%${name}%' and ProducerID = ${ProducerID} and Price between ${PriceMin} and ${PriceMax} limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
	}
	if((CatID!=-1)&(ProducerID===-1))
	{
		var sql = `select * from products where ProName like '%${name}%' and CatID=${CatID} and Price between ${PriceMin} and ${PriceMax} limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
	}
		if((CatID!=-1)&(ProducerID!=-1))
	{
		var sql = `select * from products where ProName like '%${name}%' and CatID=${CatID} and ProducerID = ${ProducerID} and Price between ${PriceMin} and ${PriceMax} limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
	}
		console.log(sql);
		return db.load(sql);
}
exports.countBySearch = (name,CatID,ProducerID,PriceMin,PriceMax) => {
	if((CatID==-1)&(ProducerID==-1))
	{
		var sql = `select count(*) as total  from products where ProName like '%${name}%' and Price between ${PriceMin} and ${PriceMax}`;
	}
	if((CatID==-1)&(ProducerID!=-1))
	{
		var sql = `select count(*) as total  from products where ProName like '%${name}%' and ProducerID = ${ProducerID} and Price between ${PriceMin} and ${PriceMax} `;
	}
	if((CatID!=-1)&(ProducerID==-1))
	{
		var sql = `select count(*) as total  from products where ProName like '%${name}%' and CatID=${CatID} and Price between ${PriceMin} and ${PriceMax} `;
	}
		if((CatID!=-1)&(ProducerID!=-1))
	{
		var sql = `select count(*) as total  from products where ProName like '%${name}%' and CatID=${CatID} and ProducerID = ${ProducerID} and Price between ${PriceMin} and ${PriceMax} `;
	}

	return db.load(sql);
}
exports.add = product => {
	var sql = `insert into products(ProName,TinyDes,FullDes,Price,CatID,Quantity) values('${product.ProName}','${product.TinyDes}','${product.FullDes}', '${product.Price}','${product.CatID}','${product.Quantity}')`;
	return db.save(sql);
}

exports.delete = id => {
	var sql = `delete from products where ProID = ${id}`;
	return db.save(sql);
}
exports.getLastProduct = () =>
{
	var sql = `select ProID from products order by ProductID desc`;
	return db.save(sql);
}