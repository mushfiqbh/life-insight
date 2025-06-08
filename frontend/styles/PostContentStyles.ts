const styles = `<style>
.post_content_parent h2 {
  font-size: xx-large;
  color: red;
  margin-top: 20px;
  margin-bottom: 10px;
}

.post_content_parent a {
  color: blue;
  text-decoration: underline;
}

.post_content_parent sup {
  color: blue;
}

.post_content_parent blockquote {
  padding: 20px;
  margin: 20px 0;
  font-size: large;
  color: #000;
  text-align: justify;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: whitesmoke;
  border-left: 5px solid var(--color-green);
}

.post_content_parent .quote {
  font-size: large;
  padding: 20px;
  font-weight: 600;
  color: var(--color-deep);
}

.post_content_parent .quote b {
  color: var(--color-silver);
  float: right;
  margin-top: 10px;
}

.post_content_parent .advice {
  font-size: x-large;
  text-align: center;
  padding: 20px;
  font-weight: 600;
  color: var(--color-deep);
}

.post_content_parent .advice hr {
  height: 5px;
  width: 150px;
  margin-top: 20px;
  margin-left: 50%;
  transform: translate(-50%);
  background-color: var(--color-green);
}

.post_content_parent ul {
  padding-left: 40px;
}

.post_content_parent li::marker {
  font-size: x-large;
  color: var(--color-green);
}

.post_content_parent li {
  margin-bottom: 10px;
  list-style-type: square;
}

.post_content_parent li b {
  color: var(--color-silver);
}

@media (max-width: 768px) {
  .post_content_parent ul {
    padding-left: 30px;
  }

  .post_content_parent ul {
    padding-left: 30px;
  }
}
</style>`;

export default styles;
