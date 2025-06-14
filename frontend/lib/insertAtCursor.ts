const insertAtCursor = (
  textareaRefCurrent: HTMLTextAreaElement,
  textToInsert: string
) => {
  const startPos = textareaRefCurrent.selectionStart;
  const endPos = textareaRefCurrent.selectionEnd;

  // Get the current value of the textareaRefCurrent
  const currentValue = textareaRefCurrent.value;

  // Insert the new text at the cursor position
  const newValue =
    currentValue.substring(0, startPos) +
    textToInsert +
    currentValue.substring(endPos);

  // Update the textareaRefCurrent value
  textareaRefCurrent.value = newValue;

  // Set the cursor position after the inserted text
  textareaRefCurrent.setSelectionRange(
    startPos + textToInsert.length,
    startPos + textToInsert.length
  );

  // Trigger a change event (if needed)
  const event = new Event("input", { bubbles: true });
  textareaRefCurrent.dispatchEvent(event);

  return newValue;
};

export default insertAtCursor;
