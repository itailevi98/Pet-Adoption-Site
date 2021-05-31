const { query } = require("../../lib/db");
const SQL = require('@nearform/sql');

async function createComment(newComment) {
    const { name, email, comment } = newComment
    try {
        await query(SQL`INSERT INTO contact_comments (name, email, comment) VALUES (${name}, ${email}, ${comment})`);
    } catch (err){
        return false;
    }
}
exports.createComment = createComment;

async function getComments() {
    const rows = await query(SQL`SELECT * FROM contact_comments`);
    return rows;
}
exports.getComments = getComments;

async function deleteComment(commentId) {
    await query(SQL`DELETE FROM contact_comments WHERE comment_id=${commentId}`);
}
exports.deleteComment = deleteComment;