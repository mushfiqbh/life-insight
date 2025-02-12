const insertAtCursor = (textarea, textToInsert) => {
  const startPos = textarea.selectionStart;
  const endPos = textarea.selectionEnd;

  // Get the current value of the textarea
  const currentValue = textarea.value;

  // Insert the new text at the cursor position
  const newValue =
    currentValue.substring(0, startPos) +
    textToInsert +
    currentValue.substring(endPos);

  // Update the textarea value
  textarea.value = newValue;

  // Set the cursor position after the inserted text
  textarea.setSelectionRange(
    startPos + textToInsert.length,
    startPos + textToInsert.length
  );

  // Trigger a change event (if needed)
  const event = new Event("input", { bubbles: true });
  textarea.dispatchEvent(event);

  return newValue;
};

export default insertAtCursor;
